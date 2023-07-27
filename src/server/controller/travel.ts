import Repo from '../repository/travel';
import { TTravel } from '@/entity/travel';

// interface ITravel{
//
// }
// class CTravel{}

const find = async () => {
  const repoTravel = await Repo.findAll()
  console.log( repoTravel )
  return repoTravel
}

const findById = async ( id: string ) => {
  const repoTravel = await Repo.findById( id )

  return repoTravel
}
const create = async ( body: TTravel ) => {
  const repoTravel = await Repo.create( body )
  console.log( repoTravel )
  return repoTravel
}
const edit = async ( body: TTravel, id: string ) => {
  const repoTravel = await Repo.update( body, id )

  return repoTravel
}
const destroy = async ( id: string ) => {
  const repoTravel = await Repo.destroy( id )
  return repoTravel
}
const Control = { find, create, edit, destroy, findById }
export default Control