import React, { FunctionComponent } from 'react';
import { defineMessages, FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';

import { EmbargoStory } from '../types';

import styles from './Embargo.module.scss';

type Props = {
    story: EmbargoStory;
};

const messages = defineMessages({
    embargoMessage: {
        defaultMessage: 'Embargo until {date}',
    },
});

const Embargo: FunctionComponent<Props> = ({ story }) => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    return (
        <div className={styles.embargo}>
            <FormattedMessage
                {...messages.embargoMessage}
                values={{
                    date: (
                        <>
                            <FormattedDate
                                value={new Date(story.published_at)}
                                year="numeric"
                                month="long"
                                day="numeric"
                                timeZone={timeZone}
                            />{' '}
                            <FormattedTime
                                value={new Date(story.published_at)}
                                hour="2-digit"
                                minute="2-digit"
                                timeZoneName="short"
                                timeZone={timeZone}
                            />
                        </>
                    ),
                }}
            />
        </div>
    );
};

export default Embargo;
