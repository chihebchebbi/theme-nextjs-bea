import translations from '@prezly/themes-intl-messages';
import { FunctionComponent } from 'react';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FormattedMessage, useIntl } from 'react-intl';

// import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { IconEnterKey } from '@/icons';

import styles from './SearchBar.module.scss';

interface Props extends SearchBoxProvided, SearchBoxExposed {}

const SearchBar: FunctionComponent<Props> = ({ currentRefinement, refine }) => {
    const { formatMessage } = useIntl();

    return (
        <form
            className={styles.container}
            method="GET"
            action="/search"
            onSubmit={(event) => event.preventDefault()}
        >
            <div className={styles.inputWrapper}>
                <FormInput
                    label={formatMessage(translations.search.inputLabel)}
                    type="search"
                    name="query"
                    value={currentRefinement}
                    onChange={(event) => refine(event.currentTarget.value)}
                    className={styles.input}
                />
                {!currentRefinement.length && (
                    <span className={styles.inputHint}>
                        <FormattedMessage
                            {...translations.search.inputHint}
                            values={{
                                inputHintExtra: (
                                    <span className={styles.inputHintDesktop}>
                                        <FormattedMessage
                                            {...translations.search.inputHintExtra}
                                            values={{
                                                keyHint: (
                                                    <span className={styles.keyHint}>
                                                        <IconEnterKey className={styles.keyIcon} />
                                                        <span>Enter</span>
                                                    </span>
                                                ),
                                                buttonLabel: (
                                                    <>
                                                        &quot;
                                                        <FormattedMessage
                                                            {...translations.search.action}
                                                        />
                                                        &quot;
                                                    </>
                                                ),
                                            }}
                                        />
                                    </span>
                                ),
                            }}
                        />
                    </span>
                )}
            </div>
            {/* TODO: This is blocked by https://linear.app/prezly/issue/TITS-4995/dedicated-search-page-implement-base-page-with-search-results */}
            {/* <Button type="submit" variation="secondary" className={styles.button}>
                <FormattedMessage {...translations.search.action} />
            </Button> */}
        </form>
    );
};

export default connectSearchBox(SearchBar);