import { Fragment } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { IconPasswordMobilePhone } from "@tabler/icons-react";
import { SettingsGroup } from "components/Settings";

import { CreatePin } from "@pages/CreatePin";
import { VerifyPinBeforeAction } from "@pages/Pin/VerifyPinBeforeAction";

import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { SettingsButton } from "@components/Settings/Button.tsx";

export function Security() {
	return (
		<Routes>
			<Route index element={<SecurityPage />} />
			<Route path="pin/verify" element={<VerifyPinBeforeAction />} />
			<Route path="pin/create/*" element={<CreatePin />} />
		</Routes>
	);
}

function SecurityPage() {
	const navigate = useNavigate();

	const onCreatePin = () => {
		navigate("pin/create");
	};

	return (
		<Fragment>
			<SubPageHeader title="Security" backLabel="Settings" />
			<PageContainer className="space-y-6">
				<SettingsGroup title="Password" description={CREATE_PASSWORD_DESC}>
					<SettingsButton title="Create password" onClick={onCreatePin} Icon={IconPasswordMobilePhone} />
				</SettingsGroup>
			</PageContainer>
		</Fragment>
	);
}

const CREATE_PASSWORD_DESC =
	"Creating a password will make your data private and secure. You will need to enter the password every time you open the app.";
