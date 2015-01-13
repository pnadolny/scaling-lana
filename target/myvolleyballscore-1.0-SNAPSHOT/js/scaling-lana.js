
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode

'use strict';



var scaling-lana = scaling-lana || {};

scaling-lana.appspot = scaling-lana.appspot || {};



scaling-lana.appspot.init =function() {
}



Number.prototype.formatMoney = function(){
        
        return accounting.formatMoney(this, {
                symbol: "$",
                precision: 2,
                thousand: ",",
                format: {
                        pos : "%s %v",
                        neg : "%s (%v)",
                        zero: "%s  --"
                }
        });

        
};



var updateMoneyMap = function() {

        var failFn = function(resp) {
                alert(resp);
        }

        var successFn = function(resp) {

                if (resp) {
                        if (resp.data.length == 0) {
                                return;
                        }
                }
                if (resp) {
                        
                        var data = '';
                        data = resp.data;
                        var treeData = new google.visualization.DataTable();
                        treeData.addColumn('string');
                        treeData.addColumn('string');
                        treeData.addColumn('number');
                        treeData.addColumn('number');
                        treeData.addRow([ 'All', null, 0, 0 ]);
                        
                        var set = {};
                        for (var i = 0; i < data.length; i++) {
                                if (data[i].type=='i') {
                                        continue;
                                }
                                set[data[i].type] = data[i].type;
                        }
                        var xx =1;
                        for (var i in set) {
                                var total = 0;
                                var payeeType = mycloudbalance.appspot.payeeType(set[i]);
                                for (var x = 0; x < data.length; x++) {
                                        if (data[x].type==set[i]) {
                                                total  = total + Math.abs(Number(data[x].total));
                                        }
                                }
                                xx = xx +1;
                                treeData.addRow([payeeType +' '+(total).formatMoney(),'All', total,xx]);
                        }
                        

                        /*
                        treeData.addRow([ 'Money in ', 'All', 0, 0 ]);
                        treeData.addRow([ 'Money out ', 'All', 0, 0 ]);

                        var parent = 'Money in ';
                        for (var i = 0; i < data.length; i++) {
                                var total = parseFloat(data[i].total);
                                if (total > 0) {
                                        treeData.addRow([
                                                        data[i].name + ' '+(Math.abs(total)).formatMoney(), parent,
                                                        total, i ]);
                                }

                        }
                        parent = 'Money out ';
                        for (var i = 0; i < data.length; i++) {
                                var total = parseFloat(data[i].total);
                                if (total < 0) {
                                        treeData.addRow([
                                                        data[i].name + ' '+(Math.abs(total)).formatMoney(), parent,
                                                        total * -1, i * -1 ]);
                                }
                        }
                        
                        */
                        
                        var tree = new google.visualization.TreeMap(document
                                        .getElementById('moneyMap_div'));
                        tree.draw(treeData, {
                                minColor : '#f00',
                                midColor : '#ddd',
                                maxColor : '#0d0',
                                headerHeight : 15,
                                title : 'Money map (all time)',
                    titleTextStyle: {color : 'black', fontName:'arial', bold: false, fontSize:14}, 
                                fontColor : 'black',
                                showScale : false
                        });
                }

                var monthlyTreeData = new google.visualization.DataTable();
                monthlyTreeData.addColumn('string');
                monthlyTreeData.addColumn('string');
                monthlyTreeData.addColumn('number');
                monthlyTreeData.addColumn('number');

                
                var r = moment().format("MMMM");
                monthlyTreeData.addRow([r, null, 0, 0 ]);
                var totalMonthlyCash = 0;
                var totalMonthlyExpenses = 0;

                for (var i = 0; i < data.length; i++) {
                        if (parseFloat(data[i].thisMonth) > 0) {
                                totalMonthlyCash = totalMonthlyCash
                                                + parseFloat(data[i].thisMonth);
                        } else {
                                totalMonthlyExpenses = totalMonthlyExpenses
                                                + parseFloat(data[i].thisMonth);
                        }
                }
                var cashKey = 'Money in ' + (totalMonthlyCash).formatMoney();
                var expenseKey = 'Money out ' + (totalMonthlyExpenses).formatMoney();

                monthlyTreeData.addRow([ cashKey, r, totalMonthlyCash, 0 ]);
                monthlyTreeData.addRow([ expenseKey, r, totalMonthlyExpenses, 0 ]);
                
                for (var i = 0; i < data.length; i++) {
                        var total = parseFloat(data[i].thisMonth);
                        if (total > 0) {
                                monthlyTreeData.addRow([
                                                data[i].name + ' '+ (Math.abs(total)).formatMoney(),
                                                cashKey, total, i ]);
                        }
                }
                for (var i = 0; i < data.length; i++) {
                        var total = parseFloat(data[i].thisMonth);
                        if (total < 0) {
                                monthlyTreeData.addRow([
                                                data[i].name + ' '+(Math.abs(total)).formatMoney(),
                                                expenseKey, total * -1, i * -1 ]);
                        }
                }

                var monthlyTree = new google.visualization.TreeMap(document
                                .getElementById('monthlyMoneyMap_div'));
                
                var today = $.datepicker.formatDate('DD MM dd, yy', new Date());
                monthlyTree.draw(monthlyTreeData, {
                        minColor : '#f00',
                        midColor : '#ddd',
                        maxColor : '#0d0',
                        headerHeight : 15,
                        title : 'Money map as of '+today,
            titleTextStyle: {color : 'black', fontName:'arial', bold: false, fontSize:14}, 
                        fontColor : 'black',
                        showScale : false
                });

        }

        getData('/cb/' + mycloudbalance.appspot.ENTITY_PAYEE, null, successFn, failFn, -1);

}
