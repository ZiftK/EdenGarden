import { Button } from "@raul_yael/cleangui";

export function BtnOutlined({ text }: { text: string }){
    return  (
        <Button variant="outlined"
                size="medium"
                style={{
                    color: "var(--green-light)", 
                    backgroundColor: "var(--green-dark-transparent-100)",
                    fontSize: "14px",
                }}
                >
            {text}
        </Button>
    )
}

export function BtnFilled({ text }: { text: string }){
    return  (
        <Button variant="filled"
                style={{
                    color: "var(--green-light)", 
                    backgroundColor: "var(--background)",
                    fontSize: "14px",
                }}
                >
            {text}
        </Button>
    )
}

export function BtnHref({text, link}: {text: string, link: string}){
    return (
        <a href={link} style={{ textDecoration: 'none' }}>
        <Button variant="text"
                style={{
                    color: "var(--green-light)", 
                    backgroundColor: "var(--background)",
                    fontSize: "14px",
                    fontWeight: "lighter"
                }}
        >
          {text}
        </Button>
      </a>
    )
}