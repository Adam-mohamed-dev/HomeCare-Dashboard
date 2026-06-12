import { useTranslation } from "react-i18next"
import { useNavigate } from "@tanstack/react-router"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { providerSchema, type ProviderFormData } from "../schemas/providerSchema"
import { getEmptyWeeklyAvailability } from "../constants"
import { useProviderStore } from "../store/useProviderStore"
import { AvailabilityScheduleSection } from "./profile-sections/AvailabilityScheduleSection"

import { FeatureHeader } from "../../../components/layout/FeatureHeader"
import { OnboardingFooter } from "../../../components/onboarding/OnboardingFooter"
import { FormSection } from "../../../components/onboarding/FormSection"
import { ProfessionalIdentitySection } from "./profile-sections/ProfessionalIdentitySection"
import { CoverageLogisticsSection } from "./profile-sections/CoverageLogisticsSection"
import { CapacityFinancialSection } from "./profile-sections/CapacityFinancialSection"
import { ContactInfoSection } from "./profile-sections/ContactInfoSection"
import { PageContainer } from "../../../components/layout/PageContainer"

interface CreateProviderProfileProps {
  providerId?: string
}

export function CreateProviderProfile({ providerId }: CreateProviderProfileProps) {
  const { t } = useTranslation('translation')
  const navigate = useNavigate()
  const addProvider = useProviderStore((s) => s.addProvider)
  const updateProvider = useProviderStore((s) => s.updateProvider)
  const getProfile = useProviderStore((s) => s.getProfile)
  const isEdit = !!providerId
  const existingProfile = isEdit ? getProfile(providerId!) : undefined

  const methods = useForm({
    resolver: zodResolver(providerSchema),
    defaultValues: existingProfile ?? {
      fullName: "",
      npiNumber: "",
      primaryDiscipline: "",
      specializedServices: "",
      zipCodes: [],
      insuranceNetworks: [],
      languagesSpoken: "",
      weeklyCapacity: 0,
      payRate: 0,
      payType: "",
      email: "",
      phone: "",
      isScheduleLocked: false,
      availability: getEmptyWeeklyAvailability()
    }
  })

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  const onFormSubmit: SubmitHandler<ProviderFormData> = (data) => {
    if (isEdit && existingProfile) {
      updateProvider(providerId!, data)
      navigate({ to: '/providers/$providerId', params: { providerId: providerId! } })
    } else {
      const id = addProvider(data)
      navigate({ to: '/providers/$providerId', params: { providerId: id } })
    }
  }

  const handleCancel = () => {
    navigate({ to: "/providers" })
  }

  return (
    <PageContainer size="standard" className="py-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-12">
          <FeatureHeader 
            breadcrumbParent={t("nav.providers")}
            breadcrumbParentLink="/providers"
            breadcrumbCurrent={isEdit ? t("onboarding.provider.edit_provider_breadcrumb") : t("onboarding.provider.new_provider_breadcrumb")}
            title={isEdit ? t("onboarding.provider.edit_provider_title") : t("onboarding.provider.create_provider_title")}
            description={isEdit ? t("onboarding.provider.edit_provider_desc") : t("onboarding.provider.create_provider_desc")}
          />

          <div className="flex flex-col gap-16">
            <FormSection title={t("onboarding.sections.professional_identity")} description={t("onboarding.sections.professional_identity_desc")}>
              <ProfessionalIdentitySection />
            </FormSection>

            <FormSection title={t("onboarding.sections.coverage_logistics")} description={t("onboarding.sections.coverage_logistics_desc")}>
              <CoverageLogisticsSection />
            </FormSection>

            <FormSection title={t("onboarding.sections.availability_schedule")} description={t("onboarding.sections.availability_schedule_desc")}>
              <AvailabilityScheduleSection />
            </FormSection>

            <FormSection title={t("onboarding.sections.capacity_financial")} description={t("onboarding.sections.capacity_financial_desc")}>
              <CapacityFinancialSection />
            </FormSection>

            <FormSection title={t("onboarding.sections.contact_info")} description={t("onboarding.sections.contact_info_desc")}>
              <div className="flex flex-col gap-8">
                <ContactInfoSection />
                <OnboardingFooter 
                  onSave={(e) => {
                    e?.preventDefault();
                    handleSubmit(onFormSubmit)(e);
                  }} 
                  onCancel={handleCancel} 
                  isSubmitting={isSubmitting}
                  submitLabel={isEdit ? t("onboarding.provider.edit_provider_btn") : t("onboarding.provider.create_provider_btn")}
                />
              </div>
            </FormSection>
          </div>
        </form>
      </FormProvider>
    </PageContainer>
  )
}
