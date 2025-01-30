type AsyncActionType = () => Promise<void>;

export class AsyncAction {
	private _action: AsyncActionType | null = null;

	async run(clear: boolean = true) {
		if (this._action) {
			await this._action();
		}

		if (clear) {
			this._action = null;
		}
	}

	set(action: AsyncActionType) {
		this._action = action;
	}
}
