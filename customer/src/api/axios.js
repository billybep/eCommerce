import axios from 'axios'
export default axios.create({ baseURL: 'http://localhost:3000' })
// export default axios.create({baseURL: 'https://cms-ecommers-server.herokuapp.com'})