export interface ContextChildren {
    children: React.ReactNode;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostsDataType {
    key: number;
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface PostsInterface {
    posts: PostsDataType[] | [];
}

export interface NotificationInterface {
    type: string;
    message: string;
    description: string;
}

export interface CreatePostFormData {
    title: string;
    body: string;
}

export interface EditPostFormData {
    id: number;
    title: string;
    body: string;
}

export interface initalStateRedux {
    posts: [] | PostsDataType[];
    loading: boolean;
    error: null | NotificationInterface;
    success: null | NotificationInterface;
}
