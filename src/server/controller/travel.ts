import RepoTravel from '../repository/travel';
import { TYPE }   from '@/server/models/dataAccess/Travel';

// interface ITravel{
//
// }
// class CTravel{}
const Repo = new RepoTravel()
const find = async () => {
  const repoTravel = await Repo.findAll()
  console.log( "test Travel find" )

  return repoTravel
}

const findById = async ( id: string ) => {
  const repoTravel = await Repo.findById( id )
  console.log( repoTravel )
  return repoTravel
}
const create   = async ( body: TYPE ) => {

  const repoTravel = await Repo.create( body )
  console.log( repoTravel )
  return repoTravel
}
const edit     = async ( body: TYPE, id: string ) => {
  const repoTravel = await Repo.update( body, id )
  console.log( repoTravel )
  return repoTravel
}
const destroy  = async ( id: string ) => {
  const repoTravel = await Repo.destroy( id )
  console.log( repoTravel )
  return repoTravel
}
const Control  = { find, create, edit, destroy, findById }
export default Control