export interface Leader {
    id: string;
    name: string;
}

export  interface Props {
    value: string;
    onChange: (leader: Leader) => void;
}