const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DEPTH = 2;
const JSON_FOLDER = "./.json";
const PROFESSOR_FOLDER = "src/content/professor";
const ADVENTURER_FOLDER = "src/content/adventurer";
const ENGINEER_FOLDER = "src/content/engineer";
const STYLIST_FOLDER = "src/content/stylist";

// get data from markdown
const getData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith("-"));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    } else if (filename.endsWith(".md") || filename.endsWith(".mdx")) {
      const file = fs.readFileSync(filepath, "utf-8");
      const { data } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join("/")
          .replace(/\.[^/.]+$/, "");
      const group = pathParts[groupDepth - 1];

      return {
        group: group,
        slug: slug,
        frontmatter: data,
      };
    } else {
      return [];
    }
  });

  const publishedPages = getPaths.filter(
    (page) => !page.frontmatter?.draft && page,
  );

  const sortedPages = publishedPages.sort((a, b) => {
    if (a.frontmatter.level < b.frontmatter.level) {
      return -1;
    }
    if (a.frontmatter.level > b.frontmatter.level) {
      return 1;
    }

    if (a.frontmatter.name < b.frontmatter.name) {
      return -1;
    }
    if (a.frontmatter.name > b.frontmatter.name) {
      return 1;
    }
    return 0;
  });

  return sortedPages;
};

try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // create json files
  fs.writeFileSync(
    `${JSON_FOLDER}/professor.json`,
    JSON.stringify(getData(PROFESSOR_FOLDER, 3)),
  );
  fs.writeFileSync(
    `${JSON_FOLDER}/adventurer.json`,
    JSON.stringify(getData(ADVENTURER_FOLDER, 3)),
  );
  fs.writeFileSync(
    `${JSON_FOLDER}/engineer.json`,
    JSON.stringify(getData(ENGINEER_FOLDER, 3)),
  );
  fs.writeFileSync(
    `${JSON_FOLDER}/stylist.json`,
    JSON.stringify(getData(STYLIST_FOLDER, 3)),
  );

  // merger json files for search
  const professor = require(`../${JSON_FOLDER}/professor.json`);
  const adventurer = require(`../${JSON_FOLDER}/adventurer.json`);
  const engineer = require(`../${JSON_FOLDER}/engineer.json`);
  const stylist = require(`../${JSON_FOLDER}/stylist.json`);
  const search = [...professor, ...adventurer, ...engineer, ...stylist];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));
} catch (err) {
  console.error(err);
}
