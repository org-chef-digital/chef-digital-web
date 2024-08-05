<template>
    <div class="container">
        <v-menu v-model="menu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-list>
                    <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="CR_RFEICOES"></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item>
                        <v-menu :close-on-content-click="false">
                            <template v-slot:activator="{ props }">
                                <v-btn block class="menu-buttons" v-bind="props">
                                    <v-icon class="mr-4">mdi-chevron-down</v-icon>
                                    <span>Status</span>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-switch v-model="status" :color="switchColor" :label="switchLabel" hide-details></v-switch>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-list-item>
                    <v-list-item>
                        <v-btn block class="menu-buttons">
                            <v-icon class="mr-4">mdi-card-plus-outline</v-icon>
                            <span>Criar Categoria</span>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn block class="menu-buttons">
                            <v-icon class="mr-4">mdi-cog-outline</v-icon>
                            <span>Configurações</span>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn block class="menu-buttons">
                            <v-icon class="mr-4">mdi-logout</v-icon>
                            <span>Sair</span>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn block class="menu-buttons">
                            <v-icon class="mr-4" color="primary">mdi-link</v-icon>
                            <span class="link-button">Copiar link</span>
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
export default {
    data: () => ({
        menu: false,
        status: false,
    }),
    computed: {
        switchColor() {
            return this.status ? 'success' : 'error';
        },
        switchLabel() {
            return this.status ? 'Aberto' : 'Fechado';
        },
    },
}
</script>

<style scoped>
.container {
    width: 300px;
}

.menu-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.link-button {
    color: #1976D2;
    border-bottom: 1px solid ;
    padding-bottom: 2px; 

}
</style>
