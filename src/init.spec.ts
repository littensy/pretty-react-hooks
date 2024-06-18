_G.__ROACT_17_MOCK_SCHEDULER__ = true;

export = () => {
	afterAll(() => {
		_G.__ROACT_17_MOCK_SCHEDULER__ = undefined;
	});
};
