# ensa_clubs

git clone ....
php artisan key:generate
make a custom .env file as a help copy it from .env.example  cp .env.example .env
run the migration    php artisan migrate:fresh --seed

documentation:
1-registration: http://localhost:80/api/register
POST for 
{firstName,
lastName=,
role=president(default in database no need to have a feild),
email,
password,
cpassword}

2-login:  http://localhost:80/api/login
{
email,
password,
}

clubs : 
GET http://localhost:80/api/v1/clubs
GET http://localhost:80/api/v1/clubs/{id}   http://localhost:80/api/v1/clubs/44 for example
POST http://localhost:80/api/v1/clubs
params: 
{
            'name'=>['required'],
            'activityDomaine'=>['required'],
            'email'=>['email'],
            'bureauMembersFile'=>['required','file','mimes:doc,docx,pdf,csv,xlx,xls,txt','max:2048'],
            'logo'=>['image','mimes:png,jpg,jpeg','max:2048'],
}

PUT or PATCH http://localhost:80/api/v1/clubs/{id}
params: 
{        
                'name'=>['required','sometimes'],
                'activityDomaine'=>['required','sometimes'],
                'email'=>['email'],
                'bureauMembersFile'=>['required','sometimes','file','mimes:doc,docx,pdf,csv,xlx,xls,txt','max:2048'],
                'logo'=>['image','mimes:png,jpg,jpeg','max:2048'],
}

DELETE http://localhost:80/api/v1/clubs/{id} 




salles : 
GET http://localhost:80/api/v1/salles
GET http://localhost:80/api/v1/salles/{id}   http://localhost:80/api/v1/salles/44 for example
POST http://localhost:80/api/v1/salles
params: 
{
                'name'=>['required'],
                'isDisponible'=>['required','boolean'],
}

PUT or PATCH http://localhost:80/api/v1/salles/{id}
params: 
{        
                'name'=>['required','sometimes'],
                'isDisponible'=>['required','sometimes','boolean'],
}

DELETE http://localhost:80/api/v1/salles/{id} 
