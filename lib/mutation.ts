import fetcher from "./fetcher";

export const auth = (mode: "signin" | "singup", body: { email: string; password: string }) =>{
      fetcher(`/${mode}`, body)
}