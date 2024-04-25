import { useState } from "react";
import { useRouter } from "expo-router";

import { IconMoonStars, IconPasswordFingerprint, IconTrash } from "tabler-icons-react-native";

import DeleteDataDialog from "../user/delete-data.tsx";

import { PageContainer, TabPageRoot } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";
import { SettingsGroup } from "@components/Settings";
import { SettingsButton, SettingsLink } from "@components/Settings/Button.tsx";

import { useSetAfterPinVerified } from "@libs/hooks/src/actions";
import { useIsAuthenticatedValue } from "@libs/hooks/src/auth";
import { useDeleteAllCards } from "@libs/hooks/src/card/data.ts";

export default function UserPage() {
	const router = useRouter();

	const isAuthenticated = useIsAuthenticatedValue();
	const deleteAllData = useDeleteAllCards();
	const setAfterPinVerified = useSetAfterPinVerified();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const deleteData = () => {
		router.navigate("/user");
		deleteAllData();
	};

	const onDeleteConfirmClick = async () => {
		setShowDeleteDialog(false);
		if (isAuthenticated) {
			setAfterPinVerified(() => deleteData);
			router.navigate("/pin/verify");
		} else {
			deleteData();
		}
	};

	return (
		<TabPageRoot>
			<HeaderTitle title="You" />
			<PageContainer style={{ gap: 24 }}>
				<SettingsGroup title="App settings">
					<SettingsLink
						isFirst
						Icon={IconPasswordFingerprint}
						title="Security"
						href="/user/security"
					/>
					<SettingsLink
						isLast
						Icon={IconMoonStars}
						title="User Interface"
						href="/user/user-interface"
					/>
				</SettingsGroup>
				<SettingsGroup title="Danger zone" description={DELETE_DESCRIPTION}>
					<SettingsButton
						isFirst
						isLast
						isDanger
						Icon={IconTrash}
						title="Delete all data"
						onPress={() => setShowDeleteDialog(true)}
					/>
				</SettingsGroup>
			</PageContainer>

			<DeleteDataDialog
				show={showDeleteDialog}
				onClose={() => setShowDeleteDialog(false)}
				onConfirm={onDeleteConfirmClick}
			/>
		</TabPageRoot>
	);
}

const DELETE_DESCRIPTION =
	"Deleting data will forever delete all data from all your devices and there is no way to recover it.";
