import {LEAO, LEOPARDO, CROCODILO, MACACO, GAZELA, HIPOPOTAMO} from "./animais-zoo.js";

class RecintosZoo {

    constructor() {
        this.recintos = [
            { nome: 'Recinto 1', bioma: ['savana'], tamanho: 10, animais: [new MACACO(3)], },
            { nome: 'Recinto 2', bioma: ['floresta'], tamanho: 5, animais: [] },
            { nome: 'Recinto 3', bioma: ['savana', 'rio'], tamanho: 7, animais: [new GAZELA(1)] },
            { nome: 'Recinto 4', bioma: ['rio'], tamanho: 8, animais: [] },
            { nome: 'Recinto 5', bioma: ['savana'], tamanho: 9, animais: [new LEAO(1)] }
        ];

        this.recintos.forEach(recinto => {
            recinto.espacoOcupado = this.calculaEspacoOcupado(recinto);
          })

        this.especies = { 'LEAO': LEAO, 
            'LEOPARDO': LEOPARDO, 
            'CROCODILO': CROCODILO, 
            'MACACO': MACACO, 
            'GAZELA': GAZELA, 
            'HIPOPOTAMO': HIPOPOTAMO }
        }

    
    calculaEspacoOcupado(recinto) {
        
        let espacoOcupado = 0;

        for (const animal of recinto.animais) {
            espacoOcupado += animal.quantidade * animal.tamanho;
        }

        if (recinto.animais.length > 1) {
            espacoOcupado++;
        }

        return espacoOcupado;
    }

    
    analisaRecintos(animal, quantidade) {

        if (!(animal in this.especies)) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        let recintosViaveis = [];

        for (const recinto of this.recintos) {
            let recintoHipotetico = { ...recinto, bioma: [...recinto.bioma], animais: [...recinto.animais] };
            this.adicionarAnimal(recintoHipotetico, animal, quantidade);

            if (this.verificaEspaco(recintoHipotetico) && this.verificaConfortoDosAnimais(recintoHipotetico)) {
                recintosViaveis.push(`${recintoHipotetico.nome} (espaço livre: ${recintoHipotetico.tamanho - recintoHipotetico.espacoOcupado} total: ${recintoHipotetico.tamanho})`);
            } 
          }

        if (recintosViaveis.length == 0) {
            return { erro: "Não há recinto viável"};
        }

        return { recintosViaveis: recintosViaveis};
    }

    adicionarAnimal(recinto, animal, quantidade) {
        
        const Animal = this.especies[animal];

        for (const animais of recinto.animais) {
            if (animais.especie == animal) {
                animais.quantidade += quantidade;
                recinto.espacoOcupado = this.calculaEspacoOcupado(recinto);
                return;
            }
        }

        recinto.animais.push(new Animal(quantidade));

        recinto.espacoOcupado = this.calculaEspacoOcupado(recinto);
    }

    verificaEspaco(recinto) {
        
        let espacoNecessario = recinto.espacoOcupado;
        
        if (espacoNecessario > recinto.tamanho) {
            return false;
        }

        return true;
    }
 
    verificaConfortoDosAnimais(recinto) {

        for (const animal of recinto.animais) {

            animal.retornaConforto(recinto);
            if (!animal.confortavel) {
                return false;
            }
        }
        return true;
    }

}

export { RecintosZoo as RecintosZoo };

const i = new RecintosZoo().analisaRecintos('MACACO', 2);
console.log(i);
