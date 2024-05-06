import React from 'react'

const LayoutWizardPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center">{children}</div>
    )
}

export default LayoutWizardPage