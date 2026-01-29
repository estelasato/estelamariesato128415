export interface ImageType {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface DeleteImageParams {
  id: number;
  fotoId: number;
}
