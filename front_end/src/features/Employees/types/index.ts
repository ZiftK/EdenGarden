import { Employee } from "@/src/shared/types"

export  interface Props {
    value: string;
    onChange: (leader: Employee) => void;
}