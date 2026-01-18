'use client';
import { JobsPage } from '@/components/jobs/JobsPage';
import { useApp } from '@/contexts/AppContext';

export default function JobsPageRoute() {
    // JobsPage requires onCreateJob prop?
    // Let's check JobsPage component signature.
    // It takes onCreateJob: (type: 'job') => void.
    // I need to provide it or refactor JobsPage.
    // For now, providing a dummy or linking to modal.
    const handleCreateJob = () => {
        console.log('Open create job modal');
        // Ideally this opens the global modal.
        // The global modal state is currently lost or needs to be in Context/Layout.
    };

    return <JobsPage onCreateJob={handleCreateJob} />;
}
