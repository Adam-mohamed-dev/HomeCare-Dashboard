import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Eye, EyeOff } from "lucide-react"
import { Modal } from "../ui/modal"
import { FormField } from "../onboarding/FormField"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

export interface PersonalInfoData {
  fullName: string
  password: string
}

interface EditPersonalInfoModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: PersonalInfoData
  onSave: (data: PersonalInfoData) => void
}

export function EditPersonalInfoModal({ isOpen, onClose, initialData, onSave }: EditPersonalInfoModalProps) {
  const { t } = useTranslation()
  const [form, setForm] = useState<PersonalInfoData>(
    initialData ?? { fullName: "", password: "" }
  )
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<{ fullName?: string; password?: string; confirmPassword?: string }>({})

  const validate = (): boolean => {
    const newErrors: { fullName?: string; password?: string; confirmPassword?: string } = {}
    if (!form.fullName.trim()) newErrors.fullName = "Name is required"
    if (!form.password) newErrors.password = "Password is required"
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (form.password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave({ fullName: form.fullName, password: form.password })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Personal Info" description="Update your profile details.">
      <div className="flex flex-col gap-6">
        <FormField label="Name" error={errors.fullName ? { message: errors.fullName } : undefined}>
          <Input
            value={form.fullName}
            onChange={(e) => {
              setForm(prev => ({ ...prev, fullName: e.target.value }))
              if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }))
            }}
            placeholder="Jane Doe"
            className={cn("h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary", errors.fullName && "ring-2 ring-destructive")}
          />
        </FormField>

        <FormField label="Password" error={errors.password ? { message: errors.password } : undefined}>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => {
                setForm(prev => ({ ...prev, password: e.target.value }))
                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }))
              }}
              placeholder="Enter new password"
              className={cn("h-12 bg-slate-50 border-none rounded-xl px-4 pr-10 focus-visible:ring-primary", errors.password && "ring-2 ring-destructive")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </FormField>

        <FormField label="Confirm Password" error={errors.confirmPassword ? { message: errors.confirmPassword } : undefined}>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }))
              }}
              placeholder="Confirm new password"
              className={cn("h-12 bg-slate-50 border-none rounded-xl px-4 pr-10 focus-visible:ring-primary", errors.confirmPassword && "ring-2 ring-destructive")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </FormField>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="button" onClick={handleSave}>
            {t("common.save")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
