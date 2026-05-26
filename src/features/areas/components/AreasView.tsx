import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Plus } from "lucide-react"
import { PageContainer } from "../../../components/layout/PageContainer"
import { ManagementPageHeader } from "../../../components/layout/ManagementPageHeader"
import { Button } from "../../../components/ui/button"
import { SearchInput } from "../../../components/ui/search-input"
import { AreaCard } from "./AreaCard"
import { AreaFormModal } from "./AreaFormModal"
import { DeleteAreaModal } from "./DeleteAreaModal"
import { MOCK_AREAS } from "../data/mockAreas"
import type { Area } from "../types"

export function AreasView() {
  const { t } = useTranslation('translation')
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [areaToEdit, setAreaToEdit] = useState<Area | null>(null)
  const [areaToDelete, setAreaToDelete] = useState<Area | null>(null)
  const [areas, setAreas] = useState<Area[]>(MOCK_AREAS)

  const filteredAreas = areas.filter(area => 
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.zips.some(zip => zip.includes(searchTerm))
  )

  const handleSaveArea = (newArea: { name: string, zips: string[] }) => {
    if (areaToEdit) {
      setAreas(areas.map(a => a.id === areaToEdit.id ? { ...a, ...newArea } : a))
      setAreaToEdit(null)
    } else {
      const newEntry = {
        id: newArea.name.toLowerCase().replace(/\s+/g, '-'),
        name: newArea.name,
        zips: newArea.zips,
        providersCount: 0,
        patientsCount: 0
      }
      setAreas([...areas, newEntry])
    }
  }

  const handleConfirmDelete = () => {
    if (areaToDelete) {
      setAreas(areas.filter(a => a.id !== areaToDelete.id))
      setAreaToDelete(null)
    }
  }

  const handleEdit = (area: Area) => {
    setAreaToEdit(area)
    setIsAddModalOpen(true)
  }

  const handleDelete = (area: Area) => {
    setAreaToDelete(area)
  }

  return (
    <PageContainer size="wide" className="py-8 flex flex-col gap-8">
      <ManagementPageHeader 
        title={t("nav.areas", { defaultValue: "Service Areas" })}
        description={t("areas.management_desc")}
        actions={
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-full md:w-auto rounded-full px-6 gap-2 h-12"
          >
            <Plus size={18} />
            {t("areas.add_new_area")}
          </Button>
        }
      />

      <div className="flex flex-col lg:flex-row items-center gap-4">
        <SearchInput 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t("areas.search_placeholder")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAreas.length > 0 ? (
          filteredAreas.map(area => (
            <AreaCard 
              key={area.id} 
              area={area} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400 gap-3">
            <p className="text-lg font-medium">{t("areas.no_areas_found")}</p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-primary font-bold hover:underline"
            >
              {t("areas.clear_filters")}
            </button>
          </div>
        )}
      </div>

      <AreaFormModal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false)
          setAreaToEdit(null)
        }} 
        onSave={handleSaveArea} 
        initialArea={areaToEdit}
      />

      <DeleteAreaModal
        isOpen={!!areaToDelete}
        onClose={() => setAreaToDelete(null)}
        onConfirm={handleConfirmDelete}
        area={areaToDelete}
      />
    </PageContainer>
  )
}
