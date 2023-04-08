export const schema_req_user = {
    type:"object",
    // required:["surname","name","lastname","type","number_corp","number_room","login","password","rules" ],

    properties:{
        surname: {
            type: "string",
            maxLength: 60
        },
        name: {
            type: "string",
            maxLength: 60,
            minLength: 2
        },
        lastname: {
            type: "string",
            maxLength: 60
        },
        email: {
            type: "string",
            maxLength: 60
        },
        post: {
            type: "string",
            maxLength: 60,
        },
        subunit: {
            type: "string",
            maxLength: 130,
        },
        type: {
            type: "string",
            maxLength: 30,
        },
        room: {
            type: "string",
            maxLength: 30,
        },
        login: {
            type: "string",
            maxLength: 30,
            minLength: 3
        },
        password: {
            type: "string",
            maxLength: 60,
            minLength: 6
        },
        phone: {
            type: "string",
            maxLength: 60,
        },
        last_ip: {
            type: ["string", "null"]
        },
        block: {
            type: "boolean"
        },
        role: {
            type: "integer"
        },
        ava: {
            type: "string"
        },
        telegram: {
            type: "string"
        }
    }
}
export const schema_req_auth_user ={
    type:"object",
    required:["login","password"],

    properties:{
        login:{                             //Логин
            type:"string",
            maxLength:30,
            minLength:3
        },
        password:{                          //Пароль
            type:"string",
            maxLength:60,
            minLength:4
        },
    }
}

export const schema_req_check_auth={
    type:"object",
    required:["token" ],

    properties:{
        token:{                             //Логин
            type:"string",
            maxLength:60,
            minLength:3
        },
    
    }
}