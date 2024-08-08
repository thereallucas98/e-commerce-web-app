export interface Picture {
  url: string
  capa: boolean
}

export interface Color {
  nome: string
  codigo: string
}

export interface Product {
  titulo: string
  valor: string
  descricao: string
  categoria: string
  cores: Color[]
  tamanhos: string[]
  fotos: Picture[]
}
