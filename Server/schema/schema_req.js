export const schema_req_user = {
    type:"object",
    required:["surname","name","lastname","type","number_corp","number_room","login","password","rules" ],

    properties:{
        surname:{
            type:"string",
            maxLength:60,   
            minLength:2
        },
        name:{
            type:"string",
            maxLength:60,
            minLength:2
        },
        lastname:{
            type:"string",
            maxLength:60
        },
        subunit:{
            type:"string",
            maxLength:100,
            minLength:3
        },
        type:{
            type:"string",
            maxLength:30,
            minLength:3
        },
        number_corp:{         
            type:"string",
            maxLength:30,
        },
        number_room:{        
            type:"string",
            maxLength:30,   
        },
        login:{
            type:"string",
            maxLength:30,
            minLength:3
        },
        password:{
            type:"string",
            maxLength:60,
            minLength:6
        },
        rules:{
            type:"string",
            maxLength:60,
        },
        phone:{
            type:"string",
            maxLength:60,
        }
    }
}
export const schema_req_auth_user ={
    type:"object",
    required:["login","password" ],

    properties:{
        login:{
            type:"string",
            maxLength:30,
            minLength:3
        },
        password:{
            type:"string",
            maxLength:60,
            minLength:6
        },
    }
}

export const schema_req_check_auth={
    type:"object",
    required:["token" ],

    properties:{
        token:{
            type:"string",
            maxLength:60,
            minLength:3
        },
    
    }
}