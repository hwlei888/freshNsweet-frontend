let RAILS_BASE_URL
let REACT_BASE_URL

if (process.env.NODE_ENV === 'development') {

    RAILS_BASE_URL = 'http://localhost:3000/'
    REACT_BASE_URL = 'http://localhost:3001/#/'


} else {

    RAILS_BASE_URL = 'https://shrouded-bayou-28028.herokuapp.com/'
    REACT_BASE_URL = 'https://hwlei888.github.io/freshNsweet-frontend/#/'

}

export {RAILS_BASE_URL,REACT_BASE_URL}