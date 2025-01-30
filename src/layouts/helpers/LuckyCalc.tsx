import React, { useEffect, useState } from "react";

const LuckyCalculator = () => {
  const [valorBase, setValorBase] = useState<string>("");
  const [valores, setValores] = useState<number[]>([]);

  // Percentuais fixos
  const porcentagensFixas = [10, 20, 35, 50, 65, 80, 100, 150];

  // Imagens associadas aos incrementos
  const imagens = [
    "/images/lucky-1.png",
    "/images/lucky-2.png",
    "/images/lucky-3.png",
    "/images/lucky-4.png",
    "/images/lucky-5.png",
    "/images/lucky-6.png",
    "/images/lucky-7.png",
    "/images/lucky-9.png",
  ];

  // Função para atualizar os valores com base no valor base
  const handleCalcular = (valorBase: number) => {
    const novosValores: number[] = porcentagensFixas.map((porcentagem) => {
      return valorBase * (1 + porcentagem / 100); // Calcula o valor com o acréscimo
    });
    setValores(novosValores);
  };

  // Atualiza o valor base e chama a função de cálculo em tempo real
  const handleValorBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoValorBase = Number(e.target.value);
    setValorBase(String(novoValorBase));
    handleCalcular(Number(novoValorBase) || 0); // Recalcula os valores imediatamente
  };

  useEffect(() => {
    handleCalcular(0);
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h5>Drop Rate</h5>
        <div className="flex items-center">
          <input
            type="number"
            id="valorBase"
            className="form-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={valorBase}
            onChange={handleValorBaseChange}
            placeholder="Digite o valor base"
          />
        </div>
      </div>

      {/* Tabela responsiva */}
      <div className="mt-6 overflow-x-auto">
        <div className="md:grid grid-cols-8 gap-4">
          {valores.map((valor, index) => (
            <div
              key={index}
              className="flex justify-evenly md:flex-col md:justify-between items-center mb-4 p-1 sm:p-0 md:mb-0 border-b border-white border-solid sm:border-b-0"
            >
              <div className="flex flex-col sm:w-full justify-between items-center gap-1 sm:border-b sm:border-white sm:border-solid">
                <img
                  src={imagens[index]}
                  height={40}
                  width={40}
                  alt={`Acréscimo ${porcentagensFixas[index]}%`}
                  className="h-12 w-12"
                />
                <span className="font-medium">{`+${porcentagensFixas[index]}%`}</span>
              </div>

              <div
                className={`sm:text-center sm:p-1 text-lg font-bold ${valor >= 100 ? "text-green-600" : "text-blue-600"}`}
              >
                {valor.toFixed(2) + "%"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuckyCalculator;
