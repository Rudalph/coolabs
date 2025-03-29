import React from 'react'
import AddBugsModal from "@/components/AddBugsModal"
import AllBugs from "@/components/AllBugs"

const BugsTracker = () => {
    return (
        <div>
            <div className="relative">
                {/* Your main content */}
                <div className="p-4">
                    <AllBugs />
                </div>

                {/* Add Bugs Modal positioned at the bottom right */}
                <div className="fixed bottom-4 right-4 z-50">
                    <AddBugsModal />
                </div>
            </div>
        </div>
    )
}

export default BugsTracker