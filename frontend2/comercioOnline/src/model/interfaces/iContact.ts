export default interface IContact {
    content: string;
    embeds: Array<{
      title: string;
      description: string;
      footer: {
        text: string;
      };
    }>;
  }