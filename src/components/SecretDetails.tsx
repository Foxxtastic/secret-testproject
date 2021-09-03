import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getSecretByHash, secretDetailsSlice, selectSecret, selectStatus } from '../features/secret/secretSlice';
import { PageContainer } from './PageContainer';

const hash = "1mekjd";
export function SecretDetails() {

    const secretDetails = useAppSelector(selectSecret);
    const status = useAppSelector(selectStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSecretByHash(hash));
    }, [dispatch, hash])

    return (
        <PageContainer>
            {secretDetails !== null &&
                <>
                    <div>{secretDetails.id} </div>
                    <div>{secretDetails.hash} </div>
                    <div>{secretDetails.secretText} </div>
                    <div>{secretDetails.createdAt} </div>
                    <div>{secretDetails.expiresAt} </div>
                    <div>{secretDetails.remainingViews} </div>
                </>}
        </PageContainer>
    )
}