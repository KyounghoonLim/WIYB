import { Resource_Brand, Resource_EquipmentType } from 'types/resource.types'
import { SERVICE_PATH } from 'constants/path.constant'
import myAxios from 'utils/axios/myAxios'

export { getBrandResourceApi, getEquipmentTypeResourceApi }

function getBrandResourceApi(): Promise<Resource_Brand[]> {
  return myAxios.get(SERVICE_PATH.CONSTANT_BRAND)
}

function getEquipmentTypeResourceApi(): Promise<Resource_EquipmentType[]> {
  return myAxios.get(SERVICE_PATH.CONSTANT_EQUIPMENT_TYPE)
}
