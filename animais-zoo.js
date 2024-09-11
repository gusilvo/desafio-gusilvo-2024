class Animal {

    constructor(especie, tamanho, bioma, carnivoro, confortavel, quantidade) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.bioma = bioma;
        this.carnivoro = carnivoro;
        this.confortavel = confortavel;
        this.quantidade = quantidade;
    }

    verificaBioma(recinto) {

        if (this.bioma.some(biomaPermitido => recinto.bioma.includes(biomaPermitido))) {
            return true;
        }
        return false;
    }

    verificarCarnivoro(recinto) {

        if (this.carnivoro && recinto.animais.length > 1) {
            return false;
            }

            return true;
        }

    retornaConforto(recinto) {

        if (this.verificaBioma(recinto) && this.verificarCarnivoro(recinto)) {
            this.confortavel = true;
            return;
        }
        this.confortavel = false;
    }
}

class LEAO extends Animal {

    constructor(quantidade) {
        super('LEAO', 3, ['savana'], true, null, quantidade);
    }
}

class LEOPARDO extends Animal {

    constructor(quantidade) {
        super('LEOPARDO', 2, ['savana'], true, null, quantidade);
    }
}

class CROCODILO extends Animal {

    constructor(quantidade) {
        super('CROCODILO', 3, ['rio'], true, null, quantidade);
    }
}

class MACACO extends Animal {

    constructor(quantidade) {
        super('MACACO', 1, ['savana', 'floresta'], false, null, quantidade);
    }

    retornaConforto(recinto) {
        super.retornaConforto(recinto);

        let quantidadeDeAnimais = 0;

        for (const animais of recinto.animais) {
            quantidadeDeAnimais += animais.quantidade;
        }
        
        if (quantidadeDeAnimais == 1) {
            this.confortavel = false;
        }
    }
}

class GAZELA extends Animal {

    constructor(quantidade) {
        super('GAZELA', 2, ['savana'], false, null, quantidade);
    }
}

class HIPOPOTAMO extends Animal {

    constructor(quantidade) {
        super('HIPOPOTAMO', 4, ['savana', 'rio'], false, null, quantidade);
    }

    retornaConforto(recinto) {
        super.retornaConforto(recinto);

        if (!recinto.bioma.includes('rio') && recinto.animais.length > 1) {
            this.confortavel = false;
        }
    }
}

export {LEAO, LEOPARDO, CROCODILO, MACACO, GAZELA, HIPOPOTAMO};
