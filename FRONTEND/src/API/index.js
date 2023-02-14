
//let BASEURL=process.env.REACT_APP_API_URL;
const BASEURL='http://localhost:80/'

const endpoints = {
  Login: 'api/login',
  Register: 'api/register',
  Logout: 'api/logout',
  Users: 'api/v1/users',
  Clubs: 'api/v1/clubs',

  Actualities: 'api/v1/actualities',
  NewActualities: 'api/v1/newest/actualities',

  Salles: 'api/v1/salles',
  SalleChangeDisponibility: 'api/v1/salles/changeDisponibility/{id}',

  ConversationsLeft: 'api/v1/conversations/{conversation}/left-group',
  ConversationsAdmins: 'api/v1/conversations/{conversation}/admins',
  ConversationsMessages: 'api/v1/conversations/{conversation}/messages',
  ConversationsAddMemeber: 'api/v1/conversations/{conversation}/adding-members',
  ConversationsARevokMemeber: 'api/v1/conversations/{conversation}/revoking-members',

  Evenements: 'api/v1/evenements',
  EvenementsChangeApprouvement: 'api/v1/evenements/changeApprouvement/{id}',


  // Add more endpoints here as needed
};

export function getUrl(endpoint) {
  return BASEURL + endpoints[endpoint];
}

export default endpoints;