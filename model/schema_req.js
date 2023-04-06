export const schema_req_user = {
    type:"object",
    // required:["surname","name","lastname","type","number_corp","number_room","login","password","rules" ],

    properties:{
        surname:{                           //Фамилия
            type:"string",
            maxLength:60,   
            minLength:2
        },
        name:{                              //Имя
            type:"string",
            maxLength:60,
            minLength:2
        },
        lastname:{                          //Отчество
            type:"string",
            maxLength:60
        },
        subunit:{                              //Тип подразделения
            type:"string",
            maxLength:100,
            minLength:3
        },
        type:{                              //Тип подразделения
            type:"string",
            maxLength:30,
            minLength:3
        },
        number_corp:{                       //Номер карты
            type:"string",
            maxLength:30,
        },
        number_room:{                       //Номер комнаты
            type:"string",
            maxLength:30,   
        },
        login:{                             //Логин
            type:"string",
            maxLength:30,
            minLength:3
        },
        password:{                          //Пароль
            type:"string",
            maxLength:60,
            minLength:6
        },
        rules:{                             //Права доступа: true - Админ; false - Гость
            type:"string",
            maxLength:60,
        },
        phone:{                             //Телефон
            type:"string",
            maxLength:60,
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