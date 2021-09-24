import Throw from "throw2";

export default (MDCClass,
{
	elementFinder = vm => vm.$refs['mdc-target']
		?? Throw('MDC component wrapper doesn\'t have a "mdc-target" ref element.'),
} = {}) => (
{
	data: () => (
	{
		mdcInstance: null,
	}),
	mounted()
	{
		this.setupMDC();
	},
	unmounted()
	{
		this.destroyMDC();
	},
	methods:
	{
		setupMDC()
		{
			this.destroyMDC();
			this.mdcInstance = new MDCClass(elementFinder(this));
		},
		destroyMDC()
		{
			this.mdcInstance?.destroy();
		},
	},
});
