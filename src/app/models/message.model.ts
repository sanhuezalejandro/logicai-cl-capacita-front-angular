export interface Message {
  id: number;
  content: string;
  author: string;
  createdAt: Date;
}

export interface CreateMessageDto {
  content: string;
  author: string;
}

