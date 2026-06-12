import { useTranslation } from "react-i18next"
import { useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientSchema } from "../schemas/patientSchema"
import type { PatientFormData } from "../schemas/patientSchema"
import { usePatientStore } from "../store/usePatientStore"

// Shared Components
import { FeatureHeader } from "../../../components/layout/FeatureHeader"
import { OnboardingFooter } from "../../../components/onboarding/OnboardingFooter"
import { FormSection } from "../../../components/onboarding/FormSection"
import { PageContainer } from "../../../components/layout/PageContainer"

// Sub-components
import { IdentitySection } from "./chart-sections/IdentitySection"
import { ResidenceSection } from "./chart-sections/ResidenceSection"
import { OutreachSection } from "./chart-sections/OutreachSection"
import { IntakeDocsSection } from "./chart-sections/IntakeDocsSection"

interface CreatePatientChartProps {
  patientId?: string
}

export function CreatePatientChart({ patientId }: CreatePatientChartProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const addPatient = usePatientStore((s) => s.addPatient)
  const updatePatient = usePatientStore((s) => s.updatePatient)
  const getProfile = usePatientStore((s) => s.getProfile)
  const isEdit = !!patientId
  const existingProfile = isEdit ? getProfile(patientId!) : undefined

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: existingProfile ? {
      fullName: existingProfile.fullName,
      gender: existingProfile.gender as "male" | "female",
      phone: existingProfile.phone,
      email: existingProfile.email,
      address: existingProfile.address,
      city: existingProfile.city,
      state: existingProfile.state,
      zipCode: existingProfile.zipCode,
      communicationMode: existingProfile.communicationMode as "text" | "phone" | "email",
      insuranceProvider: existingProfile.insurance.provider,
    } : {
      communicationMode: "text",
    }
  })

  const currentCommMode = watch("communicationMode")

  const onFormSubmit = (data: PatientFormData) => {
    if (isEdit && existingProfile) {
      updatePatient({
        ...existingProfile,
        fullName: data.fullName,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        communicationMode: data.communicationMode,
        insurance: { ...existingProfile.insurance, provider: data.insuranceProvider },
      })
      navigate({ to: '/patients/$patientId', params: { patientId: patientId! } })
    } else {
      const id = data.fullName.toLowerCase().replace(/\s+/g, '-')
      addPatient({
        id,
        fullName: data.fullName,
        mrn: Math.random().toString(36).substring(2, 8).toUpperCase(),
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        communicationMode: data.communicationMode,
        status: 'Lead',
        photoUrl: '',
        primaryDiagnosis: 'Pending evaluation',
        secondaryDiagnoses: [],
        assignedPt: 'Unassigned',
        assignedPtImg: '',
        emergencyContact: { name: '', relation: '', phone: '' },
        insurance: { provider: data.insuranceProvider, memberId: '', groupNumber: '' },
        visits: { scheduled: 0, completed: 0, missed: 0 },
        notes: { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase().replace(',', ''), author: 'COORDINATOR', content: 'Patient chart created.' },
      })
      navigate({ to: '/patients/$patientId', params: { patientId: id } })
    }
  }

  const handleCancel = () => {
    navigate({ to: "/patients" })
  }

  return (
    <PageContainer size="standard" className="py-8 flex flex-col gap-8">
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-12">
        <FeatureHeader 
          breadcrumbParent={t("nav.patients")}
          breadcrumbParentLink="/patients"
          breadcrumbCurrent={isEdit ? t("onboarding.patient.edit_chart_breadcrumb") : t("onboarding.patient.new_patient_breadcrumb")}
          title={isEdit ? t("onboarding.patient.edit_chart_title") : t("onboarding.patient.create_chart_title")}
          description={isEdit ? t("onboarding.patient.edit_chart_desc") : t("onboarding.patient.create_chart_desc")}
        />

        <div className="flex flex-col gap-16">
          <FormSection title={t("onboarding.sections.personal_identity")} description={t("onboarding.sections.personal_identity_desc")}>
            <IdentitySection register={register} errors={errors} />
          </FormSection>

          <FormSection title={t("onboarding.sections.primary_residence")} description={t("onboarding.sections.primary_residence_desc")}>
            <ResidenceSection register={register} errors={errors} />
          </FormSection>

          <FormSection title={t("onboarding.sections.outreach_strategy")} description={t("onboarding.sections.outreach_strategy_desc")}>
            <OutreachSection 
              currentCommMode={currentCommMode} 
              errors={errors} 
              setValue={setValue} 
            />
          </FormSection>

          <FormSection title={t("onboarding.sections.initial_intake_docs")} description={t("onboarding.sections.initial_intake_docs_desc")}>
            <div className="flex flex-col gap-8">
              <IntakeDocsSection register={register} />
              <OnboardingFooter 
                onSave={handleSubmit(onFormSubmit)} 
                onCancel={handleCancel} 
                isSubmitting={isSubmitting}
                submitLabel={isEdit ? t("onboarding.patient.edit_chart_btn") : t("onboarding.patient.create_chart_btn")}
              />
            </div>
          </FormSection>
        </div>
      </form>
    </PageContainer>
  )
}
