//@flow

//验证函数

//必填
export const required = (value:string) => (value ? undefined : '必填')
