export type MaskFunctions = {
  [key: string]: (value: string) => string;
};

const masks: MaskFunctions = {
  unmask: (value) => value.replace(/[^a-zA-Z0-9]/g, ''),
  number: (value) => value.replace(/\D/g, ''),
  cpf: (value) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'),
  cell: (value) =>
    value.replace(/\D/g, '').length > 10
      ? value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
      : value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{5})\d+?$/, '$1'),
}

export default masks;
