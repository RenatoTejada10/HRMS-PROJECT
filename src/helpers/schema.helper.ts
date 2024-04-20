export const handleOptions = (nameCollection: string) => {
    return {
        collection: nameCollection,
        timestamp: true,
        toJSON: {
            virtuals: true,
            transform: (_: any, ret: any) => {
                if (ret._id) {
                    ret.id = ret._id
                    delete ret._id
                } else delete ret.id
            },
        },
        toObject: {
            virtuals: true,
            transform: (_: any, ret: any) => {
                if (ret._id) {
                    ret.id = ret._id
                    delete ret._id
                } else delete ret.id
            },
        },
        versionKey: false,
    }
}
