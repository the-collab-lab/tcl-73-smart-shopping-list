import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { auth } from '../api/config';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import '../custom-styles.css';

export function SignInAlert({ action }) {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button className="custom-button">{action}</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content maxWidth="450px">
				<AlertDialog.Title>Sign In</AlertDialog.Title>
				<AlertDialog.Description size="2">
					In order to perform this action, you must sign in first.
				</AlertDialog.Description>

				<Flex gap="3" mt="4" justify="end">
					<AlertDialog.Cancel>
						<Button variant="soft" color="gray">
							Cancel
						</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button
							className="custom-button"
							variant="solid"
							onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
						>
							Sign In
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
}
