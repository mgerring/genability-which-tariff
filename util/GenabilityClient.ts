import { Genability } from '@genability/api';

const GenabilityClient = Genability.configure(
    {
        proxy:'/api/genability-proxy'
    }
)

export default GenabilityClient