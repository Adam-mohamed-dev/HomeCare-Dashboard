import { useTranslation } from "react-i18next"
import { useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientSchema } from "../schemas/patientSchema"
import type { PatientFormData } from "../schemas/patientSchema"

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

export function CreatePatientChart() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      communicationMode: "text",
      timingSlots: ["8AM - 10AM"]
    }
  })

  const currentCommMode = watch("communicationMode")
  const currentSlots = watch("timingSlots")

  const onFormSubmit = (data: PatientFormData) => {
    console.log("Creating Patient Chart:", data)
    navigate({ to: "/patients" })
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
          breadcrumbCurrent={t("onboarding.patient.new_patient_breadcrumb")}
          title={t("onboarding.patient.create_chart_title")}
          description={t("onboarding.patient.create_chart_desc")}
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
              currentSlots={currentSlots} 
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
                submitLabel={t("onboarding.patient.create_chart_btn")}
              />
            </div>
          </FormSection>
        </div>
      </form>
    </PageContainer>
  )
}
