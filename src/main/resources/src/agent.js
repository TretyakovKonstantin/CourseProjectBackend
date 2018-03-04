import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

//const API_ROOT = 'https://conduit.productionready.io/api';
 const API_ROOT = '/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', {user: {email, password}}),
  register: (username, email, password) =>
    requests.post('/users', {user: {username, email, password}}),
  save: user =>
    requests.put('/user', {user})
};

// const Tags = {
//   getAll: () => requests.get('/tags')
// };
//
// const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
// const omitSlug = article => Object.assign({}, article, {slug: undefined})
// const Articles = {
//   all: page =>
//     requests.get(`/articles?${limit(10, page)}`),
//   byAuthor: (author, page) =>
//     requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
//   byTag: (tag, page) =>
//     requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
//   del: slug =>
//     requests.del(`/articles/${slug}`),
//   favorite: slug =>
//     requests.post(`/articles/${slug}/favorite`),
//   favoritedBy: (author, page) =>
//     requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
//   feed: () =>
//     requests.get('/articles/feed?limit=10&offset=0'),
//   get: slug =>
//     requests.get(`/articles/${slug}`),
//   unfavorite: slug =>
//     requests.del(`/articles/${slug}/favorite`),
//   update: article =>
//     requests.put(`/articles/${article.slug}`, {article: omitSlug(article)}),
//   create: article =>
//     requests.post('/articles', {article})
// };
//
// const Comments = {
//   create: (slug, comment) =>
//     requests.post(`/articles/${slug}/comments`, {comment}),
//   delete: (slug, commentId) =>
//     requests.del(`/articles/${slug}/comments/${commentId}`),
//   forArticle: slug =>
//     requests.get(`/articles/${slug}/comments`)
// };

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

// const Groups = {
//   create: group =>
//     requests.post('/groups', {groups}),
//   find: partialName =>
//     requests.get('/groups', partialName),
//   userGroups: user =>
//     requests.post('/groups', user),
// };

let groups = [
  {id: '1', name: 'My First Group'},
  {id: '2', name: 'Dumbledore\'s Army'},
  {id: '3', name: 'Death Devourers'},
  {id: '4', name: 'Клуб Веселых и Находчивых'}
];

const Groups = {
    create: group => {
      groups.push(group);
      return {group: groups[groups.length - 1]}
    },
    get: id => (groups.find(group => group.id === id)),
    userGroups: user => groups,
    del: id => {
      groups = groups.filter(groups => groups.id !== id);
      return id;
    },
    //Returns groups, found by starts with partialName in ALL APPLICATION GROUPS
    find:
      partialName => groups.filter(group => group.name.includes(partialName))
  }
;

let news = [
  {
    id: '1',
    groupId: '1',
    header: "Something big happened",
    info: 'Francis Ford Coppolas legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels ' +
    'the young Vito Corleone\'s rise with his son Michael\'s spiritual fall, deepening The_Godfathers depiction of the' +
    ' dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after ' +
    'the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing ' +
    'brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro\'s business.' +
    ' With Fanucci gone, Vito\'s communal stature grows.'
  },
  {
    id: '2',
    groupId: '1',
    header: 'GodFather',
    info: 'Francis Ford Coppolas legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels' +
    ' the young Vito Corleone\'s rise with his son Michael\'s spiritual fall, deepening The_Godfathers depiction of the' +
    ' dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after' +
    ' the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing ' +
    'brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro\'s business.' +
    ' With Fanucci gone, Vito\'s communal stature grows.'
  }, {
    id: '3',
    groupId: '1',
    header: 'GodFather 2',
    info: 'After a break of more than 15 years, director Francis Ford Coppola and writer Mario Puzo returned to the ' +
    'well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime ' +
    'kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his ' +
    'family would one day be completely legitimate.'
  },
  {
    id: '4',
    groupId: '2',
    header: 'What is this',
    info: 'Dumbledore\'s Army (or D.A. for short) is a fictional student organisation in J. K. Rowling\'s Harry Potter' +
    'series that is founded by the main characters, Harry Potter, Ron Weasley and Hermione Granger, to stand up against' +
    'the regime of Hogwarts High Inquisitor Dolores Umbridge, as well as to learn practical Defence Against the Dark ' +
    'Arts. It was founded in the fifth book, Harry Potter and the Order of the Phoenix.'
  }
];

const News = {
  create: news => {
    news.push(news);
    return {news: news[news.length - 1]}
  },
  forGroup: id => {
    return news.filter(news => news.groupId === id)
  }
};

let events = [
  {
    "id": 1,
    "title": "All Day Event",
    "start": "2018-02-02"
  },
  {
    "id": 2,
    "title": "Long Event",
    "start": "2018-02-07",
    "end": "2018-02-10"
  },
  {
    "id": 3,
    "title": "Repeating Event",
    "start": "2018-02-09T16:00:00"
  },
  {
    "id": 4,
    "title": "Repeating Event",
    "start": "2018-02-16T16:00:00"
  }
];

const Events = {
  create: event => {
    return event;
  },
  del: id => {
    events = events.filter((event) => event.id !== id);
    return id;
  },
  edit: ({title, id, start, end}) => {
    console.log(events);
    const event = events.find(currentEvent => currentEvent.id === id);
    events = events.filter(currentEvent => currentEvent.id !== event.id);
    event.title = title;
    event.start = start;
    event.end = end;
    return event;
  },
    userEvents: async user => {
        let answer = (await requests.get('/events', user.id)).notes;
        console.log(">>>>>>>>>>>>>>>", answer);
        return answer;
    }
};

let notes = [
  {
    id: '1',
    header: 'Rifleman\'s Creed',
    info: 'This is my rifle. There are many like it, but this one is mine.\n' +
    'My rifle is my best friend. It is my life. I must master it as I must master my life.\n' +
    'Without me, my rifle is useless. Without my rifle, I am useless. I must fire my rifle true. I must shoot ' +
    'straighter than my enemy who is trying to kill me. I must shoot him before he shoots me. I will…'
  },
  {
    id: '2',
    header: 'Airman\'s Creed',
    info: 'The Airman\'s Creed is a creed for members of the U.S. Air Force. It was introduced in 2007 ' +
    'by General T. Michael Moseley, Chief of Staff of the U.S. Air Force.[1] In a letter introducing the creed, ' +
    'Moseley wrote that one of his "top priorities" was to "reinvigorate the warrior ethos in every Airman of our Total ' +
    'Force."[1] Thus, the intent of the creed was to enhance the building of a warrior ethos among its Airmen and ' +
    'to provide Airmen a tangible statement of beliefs.'
  },
  {
    id: '3',
    header: 'Creed of the United States Coast Guardsman',
    info: '\n' +
    'I am proud to be a United States Coast Guardsman.\n' +
    'I revere that long line of expert seamen who by their devotion to duty and sacrifice of self have made it possible' +
    'for me to be a member of a service honored and respected, in peace and in war, throughout the world.\n' +
    'I never, by word or deed, will bring reproach upon the fair name of my service, nor permit others to do so unchallenged. '
  }
];


const Notes = {
  userNotes: async user => {
    let answer = (await requests.get('/notes', user.id)).notes;
    console.log(">>>>>>>>>>>>>>>", answer);
    return answer;
  },
  create: async note => {
    let answer = (await requests.post('/notes', {note}).note).note;
    console.log(">>>>>>>>>>>>>>>", answer);
    return answer;
  },

  del: async id => {
    let answer = (await requests.del(`/notes/${id}`)).note;
    console.log(">>>>>>>>>>>>>>>", answer);
    return answer;
  }
};

export default {
  Auth,
  Profile,
  Groups,
  News,
  Events,
  Notes,
  setToken: _token => {
    token = _token;
  }
};