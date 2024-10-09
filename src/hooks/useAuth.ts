import { useContext, useEffect, useState } from 'react';
import { getUserAuthentication } from '../axios/api.ts';
import { AuthContext } from '../utils/context/AuthContext.tsx';

export function useAuth() {
	const { user, updateAuthUser } = useContext(AuthContext);
	const [loading, setLoading] = useState<boolean>(true);
	const controller = new AbortController();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUserAuthentication();
				updateAuthUser(userData.data);
			} catch (err) {
				console.log(err);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		};

		fetchUser();

		return () => {
			controller.abort();
		};
	}, []);

	return { user, loading };
}
