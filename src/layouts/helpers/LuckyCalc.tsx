import React, { useState } from "react";

const LuckyCalculator = () => {
  const [valorBase, setValorBase] = useState<number>(0);
  const [valores, setValores] = useState<number[]>([]);

  // Percentuais fixos
  const porcentagensFixas = [10, 20, 35, 50, 65, 80, 100, 150];

  // Imagens associadas aos incrementos
  const imagens = [
    "https://via.placeholder.com/30?text=10%",
    "https://via.placeholder.com/30?text=20%",
    "https://via.placeholder.com/30?text=35%",
    "https://via.placeholder.com/30?text=50%",
    "https://via.placeholder.com/30?text=65%",
    "https://via.placeholder.com/30?text=80%",
    "https://via.placeholder.com/30?text=100%",
    "https://via.placeholder.com/30?text=150%",
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
    setValorBase(novoValorBase);
    handleCalcular(novoValorBase); // Recalcula os valores imediatamente
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label
          htmlFor="valorBase"
          className="block text-sm font-medium text-gray-700"
        >
          Valor Base
        </label>
        <div className="flex items-center">
          <input
            type="number"
            id="valorBase"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={valorBase}
            onChange={handleValorBaseChange}
            placeholder="Digite o valor base"
          />
        </div>
      </div>

      {/* Tabela responsiva */}
      <div className="mt-6 overflow-x-auto">
        <div className="hidden md:grid grid-cols-10 gap-4">
          <div className="col-span-5 text-center font-semibold">Acréscimo</div>
          <div className="col-span-5 text-center font-semibold">
            Valor Final
          </div>
        </div>
        <div className="md:grid grid-cols-10 gap-4">
          {valores.map((valor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-0"
            >
              <div className="flex justify-between items-center">
                <img
                  src={imagens[index]}
                  alt={`Acréscimo ${porcentagensFixas[index]}%`}
                  className="ml-2 h-5 w-5"
                />
                <span className="font-medium">{`+${porcentagensFixas[index]}%`}</span>
              </div>
              <div className="md:text-center text-lg font-bold text-blue-600">
                {valor.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuckyCalculator;
