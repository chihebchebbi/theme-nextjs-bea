import type { ExtendedStory } from '@prezly/sdk';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import { NewsroomContextProvider } from '@/contexts/newsroom';
import { getPrezlyApi } from '@/utils/prezly';
import { BasePageProps } from 'types';

const Story = dynamic(() => import('@/modules/Story'), { ssr: true });

interface Props extends BasePageProps {
    isTrackingEnabled: boolean;
    story: ExtendedStory;
}

const StoryPreviewPage: NextPage<Props> = ({
    story,
    categories,
    newsroom,
    companyInformation,
    languages,
    locale,
    isTrackingEnabled,
}) => (
    <NewsroomContextProvider
        categories={categories}
        newsroom={newsroom}
        companyInformation={companyInformation}
        languages={languages}
        locale={locale}
        selectedStory={story}
        isTrackingEnabled={isTrackingEnabled}
    >
        <Story story={story} />
    </NewsroomContextProvider>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const api = getPrezlyApi(context.req);
    const { uuid } = context.params as { uuid: string };

    try {
        const story = await api.getStory(uuid);
        const basePageProps = await api.getBasePageProps(story.culture.code);

        return {
            props: {
                ...basePageProps,
                isTrackingEnabled: false,
                story,
            },
        };
    } catch (error) {
        // Log the error into NextJS console
        // eslint-disable-next-line no-console
        console.error(error);

        return {
            notFound: true,
        };
    }
};

export default StoryPreviewPage;
