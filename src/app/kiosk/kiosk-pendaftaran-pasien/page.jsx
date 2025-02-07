import React from 'react'
import KioskPendaftaranPasien from '@/components/view/kiosk/add-guest-kiosk'

const PendaftaranPasienGuestMachine = () => {
    return (
<<<<<<< HEAD
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md">
                <div className="p-4 md:p-6">
                    <DynamicStepForm
                        title="Pendaftaran Pasien"
                        mainFields={mainFields}
                        formConfig={formFields}
                        onSubmit={handleSubmit}
                        onFormSubmit={handleFormSubmit}
                        backPath="/kiosk"
                        isAddMode={true}
                    />
                </div>
            </div>
=======
        <div>
            <KioskPendaftaranPasien />
>>>>>>> 3abcbeb4f01d121a953dcafb481806748d6e2eaa
        </div>
    )
}

export default PendaftaranPasienGuestMachine