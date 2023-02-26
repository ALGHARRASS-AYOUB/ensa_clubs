
//let BASEURL=process.env.REACT_APP_API_URL;
const BASEURL='http://localhost:80/'

const endpoints = {
  Login: 'api/login',
  Register: 'api/register',
  Logout: 'api/logout',
  Users: 'api/v1/users',

  Clubs: 'api/v1/clubs',
  Clubs: 'api/v1/clubs',
  MyClub: 'api/v1/myclub/clubs',
  VerifyClub :'api/v1/clubs/verified',
  SuspendClub :'api/v1/clubs/suspended',

  
  Actualities: 'api/v1/actualities',
  NewActualities: 'api/v1/newest/actualities',

  Salles: 'api/v1/salles',
  DispoSalles: 'api/v1/salles?isDisponible[eq]=true',
  DispoNotReservedSalle: 'api/v1/salles?isDisponible[eq]=1&isReserved[eq]=0',
  ReservedSalle: 'api/v1/salles?isReserved[eq]=true',
  SalleChangeDisponibility: 'api/v1/salles/changeDisponibility',

  ConversationsLeft: 'api/v1/conversations/{conversation}/left-group',
  ConversationsAdmins: 'api/v1/conversations/{conversation}/admins',
  ConversationsMessages: 'api/v1/conversations/{conversation}/messages',
  ConversationsAddMemeber: 'api/v1/conversations/{conversation}/adding-members',
  ConversationsARevokMemeber: 'api/v1/conversations/{conversation}/revoking-members',

  Evenements: 'api/v1/evenements',
  EvenementsChangeApprouvement: 'api/v1/evenements/changeApprouvement',


  // Add more endpoints here as needed
};

export function getUrl(endpoint) {
  return BASEURL + endpoints[endpoint];
}

export default endpoints;