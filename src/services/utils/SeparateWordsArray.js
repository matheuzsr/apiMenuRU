module.exports = {
  separateText(texto) {
    const labels = [
      "Entrada",
      "Prato Proteico",
      "Opção",
      "Acompanhamento",
      "Guarnição",
      "Sobremesa",
    ];
    function getDelimeters(string, text) {
      const beggining = text.search(string);
      const end = beggining + string.length;
      return [beggining, end];
    }
    const delimitadores = labels.map((label) => {
      return getDelimeters(label, texto);
    });
    function getLabelText(texto, delimitador1, delimitador2 = []) {
      return texto.slice(delimitador1[1], delimitador2[0]).split("\n").join("");
    }
    const menu = {
      entrada: getLabelText(texto, delimitadores[0], delimitadores[1]),
      prato_principal: getLabelText(texto, delimitadores[1], delimitadores[2]),
      opcao: getLabelText(texto, delimitadores[2], delimitadores[3]),
      acompanhamento: getLabelText(texto, delimitadores[3], delimitadores[4]),
      guarnicao: getLabelText(texto, delimitadores[4], delimitadores[5]),
      sobremesa: getLabelText(texto, delimitadores[5], delimitadores[6]),
    };
    return menu;
  },
};
