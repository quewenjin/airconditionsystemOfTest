<template>
    <div>
        <h2>添加数据库字段</h2>
        <form>
            <label>
                数据库名称：
                <input type="text" v-model="databaseName">
            </label>
            <label>
                字段名称：
                <input type="text" v-model="fieldName">
            </label>
            <button type="button" @click="addField">添加字段</button>
        </form>
        <h2>已添加的字段</h2>
        <table>
            <thead>
                <tr>
                    <th>数据库</th>
                    <th>字段</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(field, index) in fields" :key="index">
                    <td>{{ field.database }}</td>
                    <td>{{ field.field }}</td>
                </tr>
            </tbody>
        </table>
        <button type="button" @click="generateQuery">生成查询语句</button>
        <tr>
            <th>假设所有的表都有user_id字段</th>
        </tr>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            databaseName: '',
            fieldName: '',
            fields: [],
            query: '',
            results: [],
            theRes: ''
        }
    },
    methods: {
        addField() {
            this.fields.push({
                database: this.databaseName,
                field: this.fieldName
            });
            this.databaseName = '';
            this.fieldName = '';
        },
        generateQuery() {
            const databases = [...new Set(this.fields.map(field => field.database))];
            let query = '';
            let querytest = '';
            let selectPart = 'SELECT ';
            let joinPart = ' from';
            let databasecnt = 0;
            let tmp = '';
            let flag = 0;
            databases.forEach((database, index) => {
                const selectedFields = this.fields.filter(field => field.database === database).map(field => field.field);
                query += `SELECT ${selectedFields.join(', ')} FROM ${database};`;
                if (index < databases.length - 1) {
                    query += ' ';
                }

                for(let i=0; i<selectedFields.length; i++){
                    selectPart = selectPart + database + '.' + selectedFields[i] + ',';
                }

                // selectPart = selectPart + `${database}` + ',';
                // selectPart = selectPart + `${database}.${selectedFields.join(',')}`;
                
                tmp = String.fromCharCode(97+databasecnt);
                if(flag == 0 ){
                    joinPart = joinPart + ' sjy.' + `${database}` + ' ' + tmp;
                    flag = 1;
                } else {
                    joinPart = joinPart + ' left join sjy.' + `${database}` + ' ' + tmp + ' ' + 'on ' + tmp + '.user_id=a.user_id';
                }
                databasecnt++;
            });
            selectPart = selectPart.substring(0, selectPart.length - 1);
            querytest = selectPart + joinPart + ';';
            // 简单看看结果
            console.log("简单看看生成的query语句:");
            console.log(query);
            console.log(querytest);
        }
    }
}
</script>