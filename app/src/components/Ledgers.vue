<!-- src/components/Ledgers.vue -->

  <template>
    <div class="col-sm-6 col-sm-offset-3">
      <div class="quote-area" v-if="quote">
       <ul id="example-1">
          <li v-for="ledger in ledgers">
            {{ ledger.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>

  <script>
  import auth from '../auth'
  export default {
    data() {
      return {
        ledgers: []
      }
    },
    methods: {
      getLedgers() {
        this.$http
          .get('/api/v1/ledgers/', (data) => {
            this.ledgers = data;
          }, {
            // Attach the JWT header
            headers: auth.getAuthHeader()
          })
          .error((err) => console.log(err))
      }
    },
    route: {
      // Check the users auth status before
      // allowing navigation to the route
      canActivate() {
        return auth.user.authenticated
      }
    }
  }
  </script>
